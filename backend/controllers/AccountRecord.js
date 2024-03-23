function AccountingBook(req, res) {
    const accountData = [
        { id: 1, description: "咖啡", amount: 50 },
        { id: 2, description: "電影票", amount: 120 },
        { id: 3, description: "書籍", amount: 200 }
    ];
    res.json(accountData);
}

export default AccountingBook;
