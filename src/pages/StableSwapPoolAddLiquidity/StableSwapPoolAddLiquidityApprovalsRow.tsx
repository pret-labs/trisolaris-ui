import { ChainId } from '@trisolaris/sdk'
import React from 'react'
import { ButtonPrimary } from '../../components/Button'
import { RowBetween } from '../../components/Row'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useDerivedStableSwapAddLiquidityInfo } from '../../state/stableswap-add-liquidity/hooks'
import { Field } from '../../state/stableswap-add-liquidity/actions'
import { StableSwapPoolName, STABLESWAP_POOLS } from '../../state/stableswap/constants'
import { Dots } from '../Pool/styleds'
import { useTranslation } from 'react-i18next'

type Props = {
  children: JSX.Element
  stableSwapPoolName: StableSwapPoolName
}

export default function StableSwapPoolAddLiquidityApprovalsRow({ children, stableSwapPoolName }: Props) {
  const { address } = STABLESWAP_POOLS[ChainId.AURORA][stableSwapPoolName]
  const { currencies, parsedAmounts, error, hasThirdCurrency } = useDerivedStableSwapAddLiquidityInfo(
    stableSwapPoolName
  )

  const [approval0, approve0Callback] = useApproveCallback(parsedAmounts[Field.CURRENCY_0], address)
  const [approval1, approve1Callback] = useApproveCallback(parsedAmounts[Field.CURRENCY_1], address)
  const [approval2, approve2Callback] = useApproveCallback(parsedAmounts[Field.CURRENCY_2], address)

  const currencyApprovalsData = [
    {
      approval: approval0,
      symbol: currencies[Field.CURRENCY_0]?.symbol,
      onClick: approve0Callback
    },
    {
      approval: approval1,
      symbol: currencies[Field.CURRENCY_1]?.symbol,
      onClick: approve1Callback
    }
  ]

  if (hasThirdCurrency) {
    currencyApprovalsData.push({
      approval: approval2,
      symbol: currencies[Field.CURRENCY_2]?.symbol,
      onClick: approve2Callback
    })
  }

  const hasUnapprovedTokens = currencyApprovalsData.some(({ approval }) =>
    [ApprovalState.NOT_APPROVED, ApprovalState.PENDING].includes(approval)
  )

  // If no approvals needed or there's an error, return children
  if (!hasUnapprovedTokens || error) {
    return children
  }

  const width = `${Math.floor(100 / currencyApprovalsData.length) - 2}%`

  return (
    <RowBetween>
      {currencyApprovalsData.map(({ approval, symbol, onClick }, i) => (
        <ButtonPrimary
          id={`add-liquidity-approve-button-${['a', 'b'][i]}`}
          key={symbol ?? i}
          onClick={onClick}
          disabled={[ApprovalState.PENDING, ApprovalState.APPROVED].includes(approval)}
          width={width}
        >
          <ApprovalText approvalState={approval} symbol={symbol ?? ''} />
        </ButtonPrimary>
      ))}
    </RowBetween>
  )
}

function ApprovalText({ approvalState, symbol }: { approvalState: ApprovalState; symbol: string }) {
  const { t } = useTranslation()
  switch (approvalState) {
    case ApprovalState.PENDING:
      return <Dots>Approving {symbol}</Dots>
    case ApprovalState.APPROVED:
      return <span>Approved {symbol}</span>
    case ApprovalState.UNKNOWN:
    case ApprovalState.NOT_APPROVED:
    default:
      return (
        <span>
          {t('addLiquidity.approve')} {symbol}
        </span>
      )
  }
}
