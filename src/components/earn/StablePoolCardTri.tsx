import React, { useState } from 'react'
import { Token, ChainId } from '@trisolaris/sdk'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Settings2 as ManageIcon } from 'lucide-react'

import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import DoubleCurrencyLogo from '../DoubleLogo'
import { ButtonGold } from '../Button'
import { AutoRow, RowBetween } from '../Row'
import ClaimRewardModal from '../../components/earn/ClaimRewardModalTri'

import { ChefVersions } from '../../state/stake/stake-constants'
import { useColorForToken } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { addCommasToNumber } from '../../utils'
import { getPairRenderOrder, isTokenAmountPositive } from '../../utils/pools'

import {
  Wrapper,
  PairContainer,
  ResponsiveCurrencyLabel,
  TokenPairBackgroundColor,
  StyledActionsContainer,
  Button
} from './PoolCardTri.styles'
import { StableSwapPoolName } from '../../state/stableswap/constants'
import useStablePoolsData from '../../hooks/useStablePoolsData'
import { useSingleStableFarm } from '../../state/stake/user-stable-farms'

type StablePoolCardTriProps = {
  apr: number
  apr2: number
  doubleRewards: boolean
  chefVersion: ChefVersions
  inStaging: boolean
  noTriRewards: boolean
  isPeriodFinished: boolean
  totalStakedInUSD: number
  doubleRewardToken: Token
  isStaking: boolean
  version: number
  stableSwapPoolName: StableSwapPoolName
}

const DefaultStablePoolCardtri = ({
  apr,
  apr2,
  chefVersion,
  doubleRewards,
  inStaging,
  noTriRewards,
  isPeriodFinished,
  totalStakedInUSD,
  doubleRewardToken,
  isStaking,
  version,
  enableClaimButton = false,
  enableModal = () => null,
  stableSwapPoolName
}: { enableClaimButton?: boolean; enableModal?: () => void } & StablePoolCardTriProps) => {
  const isDualRewards = chefVersion == 1

  const [stablePoolData] = useStablePoolsData(stableSwapPoolName)
  const [_token0, _token1, ..._otherTokens] = stablePoolData.tokens.map(({ token }) => token)

  const { currency0, currency1, token0, token1 } = getPairRenderOrder(_token0, _token1)

  const { t } = useTranslation()
  // get the color of the token
  const backgroundColor1 = useColorForToken(token0)

  // Only override `backgroundColor2` if it's a dual rewards pool
  const backgroundColor2 = useColorForToken(token1, () => isDualRewards)

  const history = useHistory()

  const totalStakedInUSDFriendly = addCommasToNumber(totalStakedInUSD.toString())

  function renderManageOrDepositButton() {
    const sharedProps = {
      marginLeft: '0.5rem',
      onClick: () => {
        history.push(`/tri/${stableSwapPoolName}/${version}`)
      }
    }

    return isStaking ? (
      <Button isStaking={true} {...sharedProps}>
        <ManageIcon size={20} />
      </Button>
    ) : (
      <Button disabled={isPeriodFinished} isStaking={false} {...sharedProps}>
        {t('earn.deposit')}
      </Button>
    )
  }

  return (
    <Wrapper bgColor1={backgroundColor1} bgColor2={backgroundColor2} isDoubleRewards={doubleRewards}>
      <TokenPairBackgroundColor bgColor1={backgroundColor1} bgColor2={backgroundColor2} />

      <AutoRow justifyContent="space-between">
        <PairContainer>
          <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />
          <ResponsiveCurrencyLabel>
            {currency0.symbol}-{currency1.symbol}
          </ResponsiveCurrencyLabel>
        </PairContainer>
        <StyledActionsContainer>
          {enableClaimButton && (
            <ButtonGold padding="8px" borderRadius="8px" maxWidth="65px" onClick={enableModal}>
              Claim
            </ButtonGold>
          )}
          {renderManageOrDepositButton()}
        </StyledActionsContainer>
      </AutoRow>
      <RowBetween>
        <AutoColumn>
          <TYPE.mutedSubHeader>{t('earn.totalStaked')}</TYPE.mutedSubHeader>
          <TYPE.white>{`$${totalStakedInUSDFriendly}`}</TYPE.white>
        </AutoColumn>
        <AutoColumn>
          <TYPE.mutedSubHeader textAlign="end">APR</TYPE.mutedSubHeader>
          <TYPE.white textAlign="end">
            {isDualRewards && doubleRewards && !inStaging
              ? `${apr}% TRI + ${`${apr2}%`} ${`${doubleRewardToken.symbol}`}`
              : inStaging
              ? `Coming Soon`
              : noTriRewards
              ? `${`${apr2}%`} ${`${doubleRewardToken.symbol}`}`
              : `${apr}%`}
          </TYPE.white>
        </AutoColumn>
      </RowBetween>
    </Wrapper>
  )
}

const StakingStablePoolCardTRI = (props: StablePoolCardTriProps) => {
  const { version } = props

  const stakingInfo = useSingleStableFarm(Number(version), props.stableSwapPoolName)
  const { earnedAmount, doubleRewardAmount } = stakingInfo

  const amountIsClaimable = isTokenAmountPositive(earnedAmount) || isTokenAmountPositive(doubleRewardAmount)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false)

  const enableModal = () => setShowClaimRewardModal(true)
  return (
    <>
      {showClaimRewardModal && stakingInfo && (
        <ClaimRewardModal
          isOpen={showClaimRewardModal}
          onDismiss={() => setShowClaimRewardModal(false)}
          stakingInfo={stakingInfo}
        />
      )}
      <DefaultStablePoolCardtri {...props} enableClaimButton={amountIsClaimable} enableModal={enableModal} />
    </>
  )
}

const StablePoolCardTRI = (props: StablePoolCardTriProps) => {
  const { isStaking } = props
  return isStaking ? (
    <StakingStablePoolCardTRI {...props} />
  ) : (
    <DefaultStablePoolCardtri {...props}></DefaultStablePoolCardtri>
  )
}

export default StablePoolCardTRI