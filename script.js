/* 

Showing data logs

*/

const API_URL = 'https://api.greenapi.com';

function getCredentials() {
    const idInstance = document.getElementById('idInstance').value.trim();
    const apiTokenInstance = document.getElementById('apiTokenInstance').value.trim();
    
    if (!idInstance || !apiTokenInstance) {
        throw new Error('Fill in idInstance and ApiTokenInstance');
    }
    
    return { idInstance, apiTokenInstance };
}

function displayResponse(method, data, isError = false) {
    const timestamp = new Date().toLocaleTimeString();
    const responseArea = document.getElementById('responseArea');
    
    let output = responseArea.value;
    if (output) output += '\n\n';
    
    output += `[${timestamp}] ${method}\n`;
    
    if (isError) {
        output += `ERROR: ${data}`;
    } 
    else {
        output += JSON.stringify(data, null, 2);
    }
    
    responseArea.value = output;
    responseArea.scrollTop = responseArea.scrollHeight;
}

async function callGetSettings() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const url = `${API_URL}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        displayResponse('getSettings', data);
    } 
    catch (error) {
        displayResponse('getSettings', error.message, true);
    }
}

async function callGetStateInstance() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const url = `${API_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        displayResponse('getStateInstance', data);
    } 
    catch (error) {
        displayResponse('getStateInstance', error.message, true);
    }
}

async function callSendMessage() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!phoneNumber || !message) {
            throw new Error('Fill in phone number and message');
        }
        
        const url = `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: `${phoneNumber}@c.us`,
                message: message
            })
        });
        
        const data = await response.json();
        displayResponse('sendMessage', data);
    } catch (error) {
        displayResponse('sendMessage', error.message, true);
    }
}

async function callSendFileByUrl() {
    try {
        const { idInstance, apiTokenInstance } = getCredentials();
        const phoneNumber = document.getElementById('filePhoneNumber').value.trim();
        const fileUrl = document.getElementById('fileUrl').value.trim();
        
        if (!phoneNumber || !fileUrl) {
            throw new Error('Fill in phone number and file URL');
        }
        
        const url = `${API_URL}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: `${phoneNumber}@c.us`,
                urlFile: fileUrl,
                fileName: fileUrl.split('/').pop()
            })
        });
        
        const data = await response.json();
        displayResponse('sendFileByUrl', data);
    } catch (error) {
        displayResponse('sendFileByUrl', error.message, true);
    }
}

/*

Hide or show API

*/

function togglePrivacy() {
    const passwordInput = document.getElementById('apiTokenInstance');
    const toggleIcon = document.getElementById('toggleIcon');
    
    const eyeOpen = "img/eye.png";
    const eyeClosed = "img/hide.png";

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = eyeClosed;
    } 
    else {
        passwordInput.type = 'password';
        toggleIcon.src = eyeOpen;
    }
}