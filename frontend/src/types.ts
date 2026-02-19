export interface User {
    _id: string,
    name: string,
    email: string,
    image: string,
    role: string
}

export interface LocationDate {
    latitude: number,
    longitude: number,
    formattedAdress : string
}

export interface AppContextType {
    user : User | null,
    loading : boolean,
    isAuth : boolean,
    setUser : React.Dispatch<React.SetStateAction<User | null>>,
    setIsAuth : React.Dispatch<React.SetStateAction<boolean>>,
    setLoading : React.Dispatch<React.SetStateAction<boolean>>
}