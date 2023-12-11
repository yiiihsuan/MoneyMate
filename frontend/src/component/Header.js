import React, { useState, useEffect } from 'react';
import { BiLogOut } from "react-icons/bi";
import liff from '@line/liff';
import styled from 'styled-components';

const StyledBiLogOut = styled(BiLogOut)`
  width: 36px;
  height: 36px;
  margin-top:1em;
  margin-left:1em;
`;

const Header = () => {
    const [isLiff, setIsLiff] = useState(false);


    useEffect(() => {
        // 初始化 LIFF 並檢查是否在 LIFF 環境中
        liff.init({ liffId: process.env.REACT_APP_LIFF_ID }) 
            .then(() => {
                if (liff.isInClient()) {
                    setIsLiff(true);
                }
            })
            .catch((err) => {
                console.error('LIFF 初始化失敗:', err);
            });
    }, []);

    const handleLogout = () => {
        fetch('/api/1.0/logout', { method: 'GET' })
            .then(response => {
                window.location.href = '/';
            })
            .catch(error => {
                console.error('登出失敗:', error);
            });
    };

    // 如果在 LIFF 環境中，不顯示登出按鈕
    if (isLiff) {
        return null;
    }

    return (
        <header>
            <StyledBiLogOut onClick={handleLogout} />
        </header>
    );
};

export default Header;
