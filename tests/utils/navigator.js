/**
 * An attempt to have something that looks like a navigator object
 */
export default {
    appCodeName: process.title,
    appName: process.title,
    appVersion: `${process.versions.node} (${process.platform}; ${process.arch})`,
    cookieEnabled: true,
    geolocation: undefined,
    mimeTypes: [], 
    onLine: true ,
    platform: process.platform,
    plugins: [],
    product: 'Gecko', 
    userAgent: `NodeJS/${process.version} (${process.platform}; ${process.arch})`, 
    vendor: 'Joyent', 
    vendorSub: ''
}
