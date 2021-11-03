import { ChainId, Token } from '@trisolaris/sdk'
import { useTokenContract } from '../../hooks/useContract'
import { useMasterChefContract } from './hooks-sushi'
import { STAKING } from './stake-constants'
import { NEVER_RELOAD, useSingleCallResult, useSingleContractMultipleData } from '../../state/multicall/hooks'
import { Contract } from '@ethersproject/contracts'
import { applyMiddleware } from '@reduxjs/toolkit'


export function useFarms(chainId: ChainId| undefined = undefined) {
    // APR
    // TVL
    // Name of pools
    // Price
    const activeFarms = STAKING[chainId ? chainId! : ChainId.AURORA]

    let lpAddresses = Object.keys(activeFarms).map(key => activeFarms[key].LPAddress);
    let tempTokens = Object.keys(activeFarms).map(key => activeFarms[key].Tokens).flat();
    var tokenAddresses = [... new Set(tempTokens.map(x => x.address))];

    console.log(tokenAddresses)
    const chefContract = useMasterChefContract()
  
    const totalAllocPoints = useSingleCallResult(chefContract, 'totalAllocPoint', undefined, NEVER_RELOAD)?.result?.[0]

    const rewardTokenAddress = useSingleCallResult(chefContract, 'tri', undefined, NEVER_RELOAD)?.result?.[0]
    
    const rewardTokenContract = useTokenContract(rewardTokenAddress);
    
    const rewardsPerSecond = useSingleCallResult(chefContract, 'triPerBlock', undefined, NEVER_RELOAD)?.result?.[0]
    const tokenDecimals = useSingleCallResult(rewardTokenContract, 'decimals', undefined, NEVER_RELOAD)?.result?.[0]
    const rewardsPerWeek =  rewardsPerSecond / 10 ** tokenDecimals * 3600 * 24 * 7;
    return { activeFarms };
    /*
    const pools = useMemo(() => {
      if (!poolCount) {
        return
      }
      return [...Array(poolCount.toNumber()).keys()].map(pid => [String(pid)])
    }, [poolCount])
  
    const poolInfos = useSingleContractMultipleData(pools ? chefContract : null, 'poolInfo', pools!);
    const pairAddresses = useMemo(() => {
      if (!poolInfos) {
        return
      }
      return [...Array(poolCount.toNumber()).keys()].map(pid => [String(pid)])
    }, [poolCount])
    */
    
  
  
  
    // var tokenAddresses = [].concat.apply([], poolInfos.map(x => x?.result?.poolToken.tokens))
    // console.log(tokenAddresses)
    // tokenAddresses.map(async (address) => {tokens[address] = useTokenContract(address)});
  
    /*
    var prices = await lookUpTokenPrices(tokenAddresses);
    if (extraPrices) {
      for (const [k,v] of Object.entries(extraPrices)) {
        if (v.usd) {
          prices[k] = v
        }
      }
    }
    //prices["0x194ebd173f6cdace046c53eacce9b953f28411d1"] = { usd : 1.22 } //"temporary" solution
    */
  
  /*
    const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (let i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction)
        aprs.push(apr);
      }
    }
    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (a && !isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a && a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd;
        averageApr += a.userStakedUsd * a.yearlyAPR / 100;
      }
    }
    averageApr = averageApr / totalUserStaked;
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
          + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
          + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  
  */
  }

  /*
  function useTokenPrices(tokenAddresses: String[]) {
    const prices = {}
    var i,j, temporary, chunk = 10;
    for (i = 0,j = tokenAddresses.length; i < j; i += chunk) {
        temporary = tokenAddresses.slice(i, i + chunk);
        for (const temp of temporary) {
          let ids = id_chunk.join('%2C')
          let res = await $.ajax({
            url: 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + ids + '&vs_currencies=usd',
            type: 'GET',
          })
          for (const [key, v] of Object.entries(res)) {
            if (v.usd) prices[key] = v;
          }
        }
        // do whatever
    }

    for (const id_chunk of chunk(id_array, 50)) {
      let ids = id_chunk.join('%2C')
      let res = await $.ajax({
        url: 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + ids + '&vs_currencies=usd',
        type: 'GET',
      })
      for (const [key, v] of Object.entries(res)) {
        if (v.usd) prices[key] = v;
      }
    }
    return prices
  }
  */