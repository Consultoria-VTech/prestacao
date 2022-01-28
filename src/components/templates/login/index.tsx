import React from 'react'
import FormLogin from '../../modules/forms/login'

const LoginTemplate: React.FC = () => {
  return (
    <div className="container">
      <div className="container mt-5 pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="card bg-primary border-0 mb-0">
              <div className="card-header bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3"></div>
                <div className="btn-wrapper text-center">
                  <img
                    src="/img/logo-dark.svg"
                    alt="VTech Consultoria"
                    width="150px"
                    height="38px"
                    // loading="eager"
                    // className="navbar-brand-img"
                  />
                </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
                <div id="login-error"></div>
                <FormLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
