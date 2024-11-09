import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-reducer";
import { useTranslation } from "react-i18next";

const AppContext = createContext();

const initalState = {
    language : localStorage.getItem('language') || 'fa',
    theme : localStorage.getItem('theme') || 'light',
    showSidebar:true
};

const AppProvider = ({children}) =>{
    const [state , dispatch] = useReducer(appReducer , initalState);
    const {i18n} = useTranslation();

    const changeLanguage = (lang) =>{
        dispatch({type : 'CHANGE_LANGUAGE' , payload : lang})
    }

    const changeTheme = (theme) =>{
        dispatch({type : 'CHANGE_THEME' , payload : theme})
    }
    const toggleSidebar = ()=>{
        dispatch({type : 'TOGGLE_SIDEBAR'})
    }
    useEffect(()=>{
        i18n.changeLanguage(state.language);
        localStorage.setItem('language' , state.language );
        document.body.dataset.direction = state.language === 'fa' ? 'rtl' : 'ltr';
        document.body.dataset.sidebarPosition = state.language === 'fa' ? 'right' : 'left';
    } , [state.language])

    useEffect(()=>{
        localStorage.setItem('theme' , state.theme)
    } , [state.theme])
    
    return <AppContext.Provider value={{...state , changeLanguage , changeTheme , toggleSidebar}}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () =>{
    return useContext(AppContext);
}

export {useAppContext , AppProvider}