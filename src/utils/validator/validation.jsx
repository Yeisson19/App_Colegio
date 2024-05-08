export function validateUsername (username){
    const usernameRegex = /^[0-9A-Za-z\u002A\u002E\u00F1\u00D1\u00D1\u00F1]{4,10}$/;
    return usernameRegex.test(username);
  };
  
  export  function validatePassword (password) {
    const passwordRegex = /^[0-9A-Za-z\b\s\u00f1\u002E\u0040\u00d1\u00E0-\u00FC\u0023\u002A]{8,10}$/;
    return passwordRegex.test(password);
  };
