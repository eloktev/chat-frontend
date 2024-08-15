import { useRef } from "react";


const useThrottle = (execFunc, timeout) => {

    const lastCall = useRef(Date.now());



    const throttledFunction = () => {
        if (Date.now() - lastCall.current >= timeout) {
            execFunc()
            lastCall.current = Date.now();
        }
    }

    return { throttledFunction }
}

export default useThrottle