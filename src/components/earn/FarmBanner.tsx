import React from 'react'
import styled from 'styled-components';
import { TYPE } from '../../theme';
import Card from '../Card';
import { AutoRow } from '../Row';
import spacemen from '../../assets/svg/spacemen.svg';
import spaceman from '../../assets/svg/spaceman.svg';
import spacemanOnPlanet from '../../assets/svg/spaceman_on_planet.svg';
import { AutoColumn } from '../Column';

// const StyledCard = styled(Card)`
//     // background: ${({ theme }) => theme.primary1};
//     // background: ${({ theme }) => `linear-gradient(90deg, ${theme.primary1} -34%,#000000 100%)`};
//     background: linear-gradient(90deg,#32B4FF 0%,#000000 70%, #000);
//     padding-top: 0;
//     padding-bottom: 0;
// `
// // const StyledCard = styled(Card)`
// //     // background: ${({ theme }) => theme.primary1};
// //     background: linear-gradient(90deg, #002033 -34%,#000000 100%);
// //     // background: linear-gradient(90deg, ${({ theme }) => theme.primary1}, ${({ theme }) => theme.black});
// //     // background: linear-gradient(90deg, ${({ theme }) => theme.primary1} 33%, ${({ theme }) => '#002033'} 66%, ${({ theme }) => theme.black});
// //     // background: #002033;
// //     // border: ${({ theme }) => `1px solid ${theme.primary1}`};
// //     padding-top: 0;
// //     padding-bottom: 0;
// // `

// // Gradient with blue border
// // const StyledCard = styled(Card)`
// //     background: linear-gradient(90deg, ${({ theme }) => theme.primary1}, ${({ theme }) => theme.black});
// //     border: ${({ theme }) => `1px solid ${theme.primary1}`};
// // `

// const IconWrapper = styled.div<{ size?: number }>`
//   ${({ theme }) => theme.flexColumnNoWrap};
//   align-items: center;
//   justify-content: center;
//   margin-left: .25rem;
//   & > * {
//     height: ${({ size }) => (size ? size + 'px' : '32px')};
//     width: ${({ size }) => (size ? size + 'px' : '32px')};
//   }
// `

// const IconContainer = styled(AutoColumn)`
// position: relative;
// min-height: 10rem;
// left: 9rem;
// top: 2rem;
// //   background-color: ${({ theme }) => theme.black};
// //   background-color: ${({ theme }) => '#002033'};
// `
// // const IconContainer = styled.div`
// // //   background-color: ${({ theme }) => theme.black};
// // //   background-color: ${({ theme }) => '#002033'};
// // `

// export default function FarmBanner() {
//     return (
//         <StyledCard>
//             <AutoRow justifyContent="space-between" style={{maxHeight: '13rem', overflow: 'hidden'}}>
//                 <div style={{top: '-9rem', position: 'relative'}}>
//                     <TYPE.largeHeader>
//                         Farm
//                     </TYPE.largeHeader>
//                     <TYPE.subHeader>
//                         Total TVL: $1,000
//                     </TYPE.subHeader>
//                 </div>
//                 <IconContainer>
//                     <IconWrapper size={512}>
//                         <img src={spacemanOnPlanet} />
//                     </IconWrapper>
//                     {/* <IconWrapper size={92}>
//                         <img src={spaceman} />
//                     </IconWrapper> */}
//                 </IconContainer>
//             </AutoRow>
//         </StyledCard>
//     );
// }


const StyledCard = styled(Card)`
    // background: ${({ theme }) => theme.primary1};
    background: linear-gradient(90deg, #002033 -34%,#000000 100%);
    // background: linear-gradient(90deg, ${({ theme }) => theme.primary1}, ${({ theme }) => theme.black});
    // background: linear-gradient(90deg, ${({ theme }) => theme.primary1} 33%, ${({ theme }) => '#002033'} 66%, ${({ theme }) => theme.black});
    // background: #002033;
    // border: ${({ theme }) => `1px solid ${theme.primary1}`};
    padding-top: 0;
    padding-bottom: 0;
`

// Gradient with blue border
// const StyledCard = styled(Card)`
//     background: linear-gradient(90deg, ${({ theme }) => theme.primary1}, ${({ theme }) => theme.black});
//     border: ${({ theme }) => `1px solid ${theme.primary1}`};
// `

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-left: .25rem;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

// const IconContainer = styled(AutoColumn)`
// position: relative;
// min-height: 10rem;
// //   background-color: ${({ theme }) => theme.black};
// //   background-color: ${({ theme }) => '#002033'};
// `
const IconContainer = styled.div`
//   background-color: ${({ theme }) => theme.black};
//   background-color: ${({ theme }) => '#002033'};
`

export default function FarmBanner() {
    return (
        <StyledCard>
            <AutoRow justifyContent="space-between" style={{overflow: 'hidden'}}>
                <div>
                    <TYPE.largeHeader>
                        Farm
                    </TYPE.largeHeader>
                    <TYPE.subHeader>
                        Total TVL: $1,000
                    </TYPE.subHeader>
                </div>
                <IconContainer>
                    {/* <IconWrapper size={512}>
                        <img src={spacemen} />
                    </IconWrapper> */}
                    <IconWrapper size={92}>
                        <img src={spacemen} />
                    </IconWrapper>
                </IconContainer>
            </AutoRow>
        </StyledCard>
    );
}