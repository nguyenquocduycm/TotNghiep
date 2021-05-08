export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (username, password) => {
  return async dispatch => {

    let details = {
      username: username,
      password: password,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    }).then((response)=>{
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
    }).then(([statusCode, dataRes])=>{
      if(statusCode === 200){
        console.log(dataRes);
        dispatch({
          type: LOGIN,
          token: dataRes.token,
        })
      }
      else{
        let message = 'Thông tin không hợp lệ . Xin vui lòng thử lại';
        throw new Error(message);
      }
    }).done();
  }
};

export const register = () =>{
  return async dispatch =>{
    
  }
}

export const logout = () => {
  return {type: LOGOUT};
}



