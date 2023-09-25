import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4  } from 'uuid'

export const UUIDContext = createContext()

  export const UUIDProvider = ({ children }) => {
    const storedUniqueId = localStorage.getItem('uuid');

    const uniqueId = storedUniqueId || uuidv4();

    const [uuid, setUuid] = useState(uniqueId);

    useEffect(() => {
      localStorage.setItem('uuid', uuid);
    }, [uuid]);

    useEffect(() => {
      localStorage.getItem('uuid');
    }, []);

    return (
      <UUIDContext.Provider value={{ uuid }}>
        {children}
      </UUIDContext.Provider>
    );
  };
