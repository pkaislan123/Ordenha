import React from 'react';
import './styles.css';
import Grid from '@material-ui/core/Grid';

import {

    Link

} from "react-router-dom";
const NavBarAdmin = () => {




  

    return (
        <div id='navbaradmin' style={{ backgroundColor: 'black' }}>
            <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}

            >
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >

                    <div style={{ paddingTop: 10 }} >
                        <Link className="a"

                            to={{
                                pathname: "/",

                            }}
                        >

                            <h1 >
                                <span style={{ paddingLeft: 50, fontSize: 54, color: 'white' }}>titaniwm</span>

                            </h1>

                        </Link>
                    </div>
                </Grid>




            </Grid>

        </div >
    )
}
export default NavBarAdmin;
