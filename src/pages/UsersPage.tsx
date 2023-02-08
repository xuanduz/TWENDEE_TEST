import { useEffect, useState } from "react"
import { useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { userTableSelector } from "../atom/User.atom"
import Table from "../components/Table"

export enum DataFields {
  USERNAME = 'username',
  FULLNAME = 'fullName',
  THUMBNAIL = 'thumnail'
}

export interface ColumnTypes {
  dataField: DataFields,
  label: string,
  sort?: boolean
}

export interface UserDataTypes {
  login: {
    uuid: string,
    username: string,
  },
  name: {
    title: string,
    first: string,
    last: string
  },
  picture: {
    thumbnail?: string
  },
}

export const UsersPage = () => {
  const dataLoadable = useRecoilValueLoadable(userTableSelector)
  const [users, setUsers] = useState([] as any)
  const setDataUserTable = useSetRecoilState(userTableSelector)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (dataLoadable.state == "hasValue") {
      const response = dataLoadable?.contents
      if (response?.results) {
        setUsers(response?.results)
      } else {
        setErrorMessage(response.error || 'Something was wrong !!!')
      }
    }
  }, [dataLoadable.state])

  const columns: ColumnTypes[] = [
    {
      dataField: DataFields.FULLNAME,
      label: 'Full Name',
      sort: true,
    },
    {
      dataField: DataFields.USERNAME,
      label: 'Username',
      sort: true,
    },
    {
      dataField: DataFields.THUMBNAIL,
      label: 'Thumbnail',
    },
  ]

  return (
    <>
      <h1 className="text-center pt-2">User Table</h1>
      {
        errorMessage 
        ? <h3 className="text-center pt-2">{errorMessage}</h3>
        : <Table columns={columns} data={users} setDataUserTable={setDataUserTable} />
      }
    </>
  )
}

export default UsersPage