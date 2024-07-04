'use client'

export default function GlobalError() {
    return (
        <div className="authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-6">
                        <div className="error-page">
                            <div className="error-inner text-center">
                                <div className="dz-error" data-text="503">OOPs</div>
                                <h4 className="error-head"><i className="fa fa-times-circle text-danger"></i> Something Went Wrong</h4>

                                <div>
                                    <button className="btn btn-secondary" onClick={() => reset()}>Try Again</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}