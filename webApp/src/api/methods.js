// 引入默认接口
import requests from "@/api/request";
// 引入Node接口
import nodeRequests from "@/api/nodeAjax";
// 引入mock接口
import mockRequests from "@/api/mockAjax";
// java请求
export let request = {
    /**
     *封装get方法
     *@param{String} url [请求地址]
     *@param{Object} params 请求参数
     */
    Get(url, params) {
        return new Promise((resolve, reject) => {
            requests
                .get(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装post方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Post(url, params = {}) {
        return new Promise((resolve, reject) => {
            requests
                .post(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }

                });
        });
    },
    /**
     *封装put方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Put(url, params) {
        return new Promise((resolve, reject) => {
            requests
                .put(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装patch方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Patch(url, params) {
        return new Promise((resolve, reject) => {
            requests
                .put(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装delete方法
     *@param{String} url [请求地址]
     *@param{Object} params [请求参数]
     */
    Delete(url, params) {
        return new Promise((resolve, reject) => {
            requests
                .delete(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    }
}
// node请求
export let nodeRequest = {
    /**
     *封装get方法
     *@param{String} url [请求地址]
     *@param{Object} params 请求参数
     */
    Get(url, params) {
        return new Promise((resolve, reject) => {
            nodeRequests
                .get(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装post方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Post(url, params = {}) {
        return new Promise((resolve, reject) => {
            nodeRequests
                .post(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }

                });
        });
    },
    /**
     *封装put方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Put(url, params) {
        return new Promise((resolve, reject) => {
            nodeRequests
                .put(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装patch方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Patch(url, params) {
        return new Promise((resolve, reject) => {
            nodeRequests
                .put(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装delete方法
     *@param{String} url [请求地址]
     *@param{Object} params [请求参数]
     */
    Delete(url, params) {
        return new Promise((resolve, reject) => {
            nodeRequests
                .delete(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    }
}
// mock请求
export let mockRequest = {
    /**
     *封装get方法
     *@param{String} url [请求地址]
     *@param{Object} params 请求参数
     */
    Get(url, params) {
        return new Promise((resolve, reject) => {
            mockRequests
                .get(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装post方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Post(url, params = {}) {
        return new Promise((resolve, reject) => {
            mockRequests
                .post(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }

                });
        });
    },
    /**
     *封装put方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Put(url, params) {
        return new Promise((resolve, reject) => {
            mockRequests
                .put(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装patch方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Patch(url, params) {
        return new Promise((resolve, reject) => {
            mockRequests
                .put(url, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    },
    /**
     *封装delete方法
     *@param{String} url [请求地址]
     *@param{Object} params [请求参数]
     */
    Delete(url, params) {
        return new Promise((resolve, reject) => {
            mockRequests
                .delete(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.code === 200) {
                        return resolve(error.data)
                    } else {
                        reject(error.message);
                    }
                });
        });
    }
}


