import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-reducer";
import { useTranslation } from "react-i18next";

const AppContext = createContext();

const initalState = {
    language : localStorage.getItem('language') || 'fa'
};

const AppProvider = ({children}) =>{
    const [state , dispatch] = useReducer(appReducer , initalState);
    const {i18n} = useTranslation();

    const changeLanguage = (lang) =>{
        dispatch({type : 'CHANGE_LANGUAGE' , payload : lang})
    }

    useEffect(()=>{
        i18n.changeLanguage(state.language);
        localStorage.setItem('language' , state.language );
        document.body.dataset.direction = state.language === 'fa' ? 'rtl' : 'ltr';
    } , [state.language])
    
    return <AppContext.Provider value={{...state , changeLanguage}}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () =>{
    return useContext(AppContext);
}

export {useAppContext , AppProvider}