import UUID from "uuid/v1.js";

export const openBankAuthUrl = () => {
    const authUrl =
        'https://api.lion.mlabs.dpc.hu:8243/authorize' +
        '?response_type=code' +
        '&scope=openid profile accounts payments' +
        '&client_id=PttPN26uJLQgvRjSrhmh5ShaqZga' +
        '&redirect_uri=https://acefintech.mlabs.dpc.hu/lionfintech/customer/banks/authorize' +
        '&nonce=' + UUID() +
        '&state=2293e2cf-1c54-38cf-9934-6be4e94e60f8' +
        '&consentType=login';
    console.log(encodeURI(authUrl));
    window.location.assign(encodeURI(authUrl));
};

export const openBankPaymentAuthUrl = (bank, consentId) => {
    if (bank) {
        const authUrl = `${bank.authorizeUrl}?response_type=code&scope=openid profile accounts payments&client_id=${bank.clientId}&redirect_uri=${bank.callbackUrl}&state=${
            btoa(`{"bankid": "${bank.bankId}", "consentId":  "${consentId}"}`)
            }&consentId=${consentId}&consentType=payments`;
        console.log(encodeURI(authUrl));
        window.location.assign(encodeURI(authUrl));
    } else alert('Bank is missing')
};
