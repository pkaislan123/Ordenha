import React from 'react';
import './styles.scss';
import Grid from '@material-ui/core/Grid';
import { isMobile } from 'react-device-detect';

const TextoNivelado = (props) => {
    return (
        <div>
            <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                justifyContent="center"
                alignItems="center"
                style={{ fontSize: 20, whiteSpace: 'pre-wrap' }}
            >

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={10} xl={10} >
                    <span> {props.texto} </span>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

            </Grid>
        </div>
    )
}


const SubTitulo = (props) => {
    return (
        <div>
            <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 30, paddingBottom: 10, fontSize: 28 }}
            >

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={10} xl={10} >
                    <span style={{ fontWeight: 'bold' }}> {props.texto} </span>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

            </Grid>
        </div>
    )
}


const Fonte = (props) => {
    return (
        <div>
            <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                justifyContent="center"
                alignItems="center"
                style={{ fontSize: 22, paddingTop: 30, paddingBottom: 20 }}
            >

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={10} xl={10} >
                    <p>
                        Fonte:

                        <a href={props.url_fonte} style={{ fontWeight: 'bold' }}> {props.nome_fonte} </a>

                    </p>

                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

            </Grid>
        </div>
    )
}


const Citacao = (props) => {
    return (
        <div>
            <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                style={{ fontWeight: 'bold', fontSize: isMobile ? 22 : 36 }}
                justifyContent="center"
                alignItems="center"
            >


                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid
                    container
                    direction="row"
                    item xs={12} sm={12} md={12} lg={10} xl={10}
                    style={{ fontWeight: 'bold', fontSize: isMobile ? 22 : 36, paddingTop: 30 }}
                >

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}
                    >
                    </Grid>

                    <Grid
                        container
                        direction="column"
                        item xs={12} sm={12} md={12} lg={12} xl={12}
                        style={{ fontWeight: 'bold', fontSize: isMobile ? 22 : 36 }}
                    >
                        <div style={{ backgroundColor: 'red', width: 5, height: '100%' }}>  </div>

                        <span style={{ paddingLeft: 20 }}> {props.texto} </span>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                    </Grid>

                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>
            </Grid>
        </div>
    )
}


const Video = (props) => {
    return (
        <div>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                style={{ paddingTop: 30 }}
            >
                <iframe
                    width="100%"
                    height="532"
                    src={props.video1}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            </Grid>
        </div>
    )
}





const BlogPage1 = (props) => {



    return (
        <div >

            
            <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 40, paddingBottom: 40 }}
            >

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    <SubTitulo texto={props.sub_titulo1} ></SubTitulo>
                    <TextoNivelado texto={props.texto1} ></TextoNivelado>
                    {props.img1 && props.img1.length > 0 ?
                        <Grid item
                            container
                            justifyContent="center"
                            alignItems="center"
                            xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: 30 }}>
                            <img alt="img1"

                                src={props.img1}
                            />
                        </Grid>
                        : <div></div>}
                    {props.video1 && props.video1.length > 0 ?
                        <Video video1={props.video1} ></Video>
                        : <div></div>}
                    {props.citacao && props.citacao.length > 0 ?
                        <Citacao texto={props.citacao} ></Citacao>
                        : <div></div>}

                    <SubTitulo texto={props.sub_titulo2} ></SubTitulo>
                    <TextoNivelado texto={props.texto2} ></TextoNivelado>
                    {props.img2 && props.img2.length > 0 ?
                        <Grid item
                            container
                            justifyContent="center"
                            alignItems="center"
                            xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: 30 }}>
                            <img alt="img2"

                                src={props.img2}
                            />
                        </Grid>
                        : <div></div>}
                    {props.video2 && props.video2.length > 0 ?
                        <Video video2={props.video2} ></Video>
                        : <div></div>}

                    <SubTitulo texto={props.sub_titulo3} ></SubTitulo>
                    <TextoNivelado texto={props.texto3} ></TextoNivelado>
                    {props.img3 && props.img3.length > 0 ?
                        <Grid item
                            container
                            justifyContent="center"
                            alignItems="center"
                            xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: 30 }}>
                            <img alt="img3"

                                src={props.img3}
                            />
                        </Grid>
                        : <div></div>}
                    {props.video3 && props.video3.length > 0 ?
                        <Video video3={props.video3} ></Video>
                        : <div></div>}

                    <SubTitulo texto={props.sub_titulo4} ></SubTitulo>
                    <TextoNivelado texto={props.texto4} ></TextoNivelado>
                    {props.img4 && props.img4.length > 0 ?
                        <Grid item
                            container
                            justifyContent="center"
                            alignItems="center"
                            xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: 30 }}>
                            <img alt="img4"

                                src={props.img4}
                            />
                        </Grid>
                        : <div></div>}
                    {props.video4 && props.video4.length > 0 ?
                        <Video video4={props.video4} ></Video>
                        : <div></div>}

                    <SubTitulo texto={props.sub_titulo5} ></SubTitulo>
                    <TextoNivelado texto={props.texto5} ></TextoNivelado>
                    {props.img5 && props.img5.length > 0 ?
                        <Grid item
                            container
                            justifyContent="center"
                            alignItems="center"
                            xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: 30 }}>
                            <img alt="img5"

                                src={props.img5}
                            />
                        </Grid>
                        : <div></div>}
                    {props.video5 && props.video5.length > 0 ?
                        <Video video5={props.video5} ></Video>
                        : <div></div>}

                    {props.nome_fonte && props.nome_fonte.length > 0 &&
                        props.url_fonte && props.url_fonte.length > 0
                        ?
                        <Fonte nome_fonte={props.nome_fonte} url_fonte={props.url_fonte} ></Fonte>
                        : <div></div>}

                </Grid>
             
            </Grid>
        </div >
    )
}
export default BlogPage1;