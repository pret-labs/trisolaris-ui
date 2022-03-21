import { CurrencyAmount, ChainId } from '@trisolaris/sdk'
import { BigNumber } from 'ethers'
import { useCallback } from 'react'
import { StableSwapPoolName, STABLESWAP_POOLS } from '../state/stableswap/constants'
import { useTransactionAdder } from '../state/transactions/hooks'
import { unwrappedToken } from '../utils/wrappedCurrency'
import { useStableSwapContract } from './useContract'
import useTransactionDeadline from './useTransactionDeadline'

type Props = {
  amount: CurrencyAmount | undefined
  estimatedAmounts: CurrencyAmount[]
  stableSwapPoolName: StableSwapPoolName
  withdrawTokenIndex: number | null
}

export default function useStableSwapRemoveLiquidity({
  amount,
  estimatedAmounts,
  withdrawTokenIndex,
  stableSwapPoolName
}: Props): () => Promise<string> {
  const pool = STABLESWAP_POOLS[ChainId.AURORA][stableSwapPoolName]
  const swapContract = useStableSwapContract(stableSwapPoolName)
  const amountString = amount?.raw.toString()

  const addTransaction = useTransactionAdder()
  let deadline = useTransactionDeadline()
  const currentTime = BigNumber.from(new Date().getTime())
  if (deadline && deadline < currentTime.add(10)) {
    deadline = currentTime.add(10)
  }

  const removeLiquidity = useCallback(async () => {
    if (amountString == null) {
      return
    }

    let transaction
    if (withdrawTokenIndex != null) {
      transaction = await swapContract?.removeLiquidityOneToken(
        amountString,
        withdrawTokenIndex,
        estimatedAmounts[withdrawTokenIndex].raw.toString(),
        deadline?.toNumber()
      )
    } else {
      transaction = await swapContract?.removeLiquidity(
        amountString,
        estimatedAmounts.map(v => v.raw.toString()),
        deadline?.toNumber()
      )
    }

    await transaction.wait()

    addTransaction(transaction, {
      summary: `Removed Liquidity: ${CurrencyAmount.fromRawAmount(unwrappedToken(pool.lpToken), amountString)} ${
        pool.lpToken.symbol
      }`
    })

    return transaction
  }, [addTransaction, amountString, deadline, estimatedAmounts, pool.lpToken, swapContract, withdrawTokenIndex])

  return removeLiquidity
}