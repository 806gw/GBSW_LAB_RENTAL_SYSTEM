import * as S from "./style"

const Loading = () => {
    return (
        <S.LoadingBackground>
            <S.LoadingCont>
                <S.LoadingWrap viewBox="25 25 50 50" width="50" height="50">
                    <circle r="20" cy="50" cx="50"></circle>
                </S.LoadingWrap>
                <h1>실습실을 조회중입니다 ..</h1>
            </S.LoadingCont>
        </S.LoadingBackground>
    )
}
export default Loading