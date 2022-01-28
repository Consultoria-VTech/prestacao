import { GetServerSideProps, NextPage } from 'next'
import ServerCookie from 'next-cookies'
import { AuthToken } from '../services/auth-token'
import { ComponentProps } from '../types/component'
import HomeLayout from './../components/layout/home/index'
import { COOKIES } from './../util/constants'

const HomePage: NextPage<ComponentProps> = props => {
  return (
    <HomeLayout>
      <div className="container-fluid">
        <main
          style={{ height: '90vh' }}
          className="align-items-center d-flex justify-content-center py-4">
          <div className="text-center">
            <img src="img/icon.svg" alt="Icone" width={455} />
            <h1 style={{ fontSize: '3.6em' }}></h1>
            <h2 className="col">{props?.message}</h2>
          </div>
        </main>
      </div>
    </HomeLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  let message = 'Seja bem-vindo! '

  const token = ServerCookie(context)[COOKIES.authToken]
  const auth = new AuthToken(token)

  if (auth.user) {
    message += auth.user.nome
  }
  return {
    props: {
      message,
    },
  }
}

export default HomePage
