// Header.js
import React from 'react';
import { BiLogOut } from "react-icons/bi";

const Header = () => {
    const handleLogout = () => {
        fetch('/api/1.0/logout', { method: 'GET' })
            .then(response => {
                // 處理響應，例如重定向到登入頁面
                window.location.href = '/';
            })
            .catch(error => {
                // 處理錯誤
                console.error('登出失敗:', error);
            });
    };
    

    return (
        <header>
            {/* 其他 header 內容 */}
            <BiLogOut onClick={handleLogout} />
        </header>
    );
};

export default Header;
