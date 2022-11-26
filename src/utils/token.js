//处理(保存)token
export const setToken = (token) => {
	sessionStorage.setItem('TOKEN',token);
}

//清理token
export const clearToken = () => {
	sessionStorage.removeItem('TOKEN');
}