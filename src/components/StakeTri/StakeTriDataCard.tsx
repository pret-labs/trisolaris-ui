import React from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import { AutoRow, RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { CardSection } from '../earn/styled'

type Props = {
    children: React.ReactNode,
    label: string,
}

const DataColumn = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
   flex-direction: row;
 `};
 `

export const StyledDataCard = styled(AutoColumn)`
   background-color: ${({ theme }) => theme.bg2}
  border: 1px solid ${({ theme }) => theme.primary1};

   border-radius: 10px;
   width: 100%;
   position: relative;
   overflow: hidden;
 `
export default function StakeTriDataCard({
    children,
    label,
}: Props) {
    return (
        <DataColumn style={{ alignItems: 'baseline' }}>
            <StyledDataCard>
                <CardSection>
                    <AutoColumn gap="md">
                        <AutoRow justify='center'>
                            <TYPE.black fontWeight={600}>{label}</TYPE.black>
                        </AutoRow>
                        {children}
                    </AutoColumn>
                </CardSection>
            </StyledDataCard>
        </DataColumn>
    )
}
