export default {
    set: function (name, value, day) {
        document.cookie = name + "=" + value + ";expires=" + 0;
    },
    get: function (name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    },
    del: function (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}