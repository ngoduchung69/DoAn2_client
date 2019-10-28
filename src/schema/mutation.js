import { gql } from 'apollo-boost';

export const AddUserMutation = gql`
mutation AddUser($name:String!, $mssv:Int!, $role:Boolean!, $tel:Int!, $age:Int!) {
    addUser(name:$name, mssv:$mssv, role:$role, age:$age, tel:$tel) {
        name
        _id
        mssv
        role
        age
        tel
    }
}
`

export const UpdateUserMutation = gql`
mutation UpdateUser($name:String!, $mssv:Int!, $role:Boolean!, $_id:ID!, $tel:Int!, $age:Int!) {
    updateUser(name:$name, mssv:$mssv, role:$role, _id:$_id, age:$age, tel:$tel) {
        name
        _id
        mssv
        role
    }
}
`

export const DeleteUserMutation = gql`
mutation DeleteUser($_id:ID!) {
    deleteUser(_id:$_id) {
        name
        _id
        mssv
        role
    }
}
`