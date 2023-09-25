import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from 'react-oidc-context';
import { UUIDContext } from './UUIDContext';

export const AxiosContext = createContext()

export const AxiosProvider = ({ children }) => {
  const auth = useAuth()
  const { uuid } = useContext(UUIDContext)

  const publicAxios = axios.create({
    baseURL: 'http://webshop.local/api/v1',
  })

  const authAxios = axios.create({
    baseURL: 'http://webshop.local/api/v1',
  })

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization && auth.user?.access_token) {
        config.headers.Authorization = `Bearer ${auth.user?.access_token}`
      }
      config.params = {
        ...config.params,
        session_id: uuid
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  return (
    <AxiosContext.Provider value={{
      authAxios,
      publicAxios,
    }}>
      {children}
    </AxiosContext.Provider>
  )
};
