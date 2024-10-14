import * as S from "./style";
import * as C from "@src/allFiles"

import SymbolNew from "@media/symbol-new-only.png"
import SymbolOld from "@media/symbol-only.png"



const LoginForm = () => {
    return (
        <>
            <C.NotLoginSide />
            <S.TopCont>
                <S.Parent>
                    <S.MainCont>
                        <S.LoginCont>
                            <S.LoginSubCont>
                                <S.LoginTitle>
                                    <S.LoginLogoCont>
                                        <img src={SymbolNew} alt="logo-new" className="gbsw_new_logo" />
                                        <img src={SymbolOld} alt="logo-old" className="gbsw_old_logo" />
                                    </S.LoginLogoCont>
                                    <S.LoginTextCont>
                                        <div style={{ fontSize: '1.35rem' }}>
                                            <span style={{ color: '#00AA87' }}>경소마고</span> · <span
                                                style={{ color: '#004D89' }}>경소고</span>
                                        </div>
                                        <div className="tag_bottom">랩실 대여 시스템</div>
                                    </S.LoginTextCont>
                                </S.LoginTitle>
                                <div>
                                    <C.LoginContainer />
                                </div>
                            </S.LoginSubCont>
                        </S.LoginCont>
                        <S.RentalStauts />
                    </S.MainCont>
                </S.Parent>
            </S.TopCont>
        </>
    );
};

export default LoginForm
