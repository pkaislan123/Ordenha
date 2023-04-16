import './styles.scss';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';



const RodapeBlog = () => {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function listarCategorias() {
            try {
                const response = await api.get('/v1/protected/noticias/listarCategorias');
                setCategorias(response.data);

            } catch (_err) {
                // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
                console.log("Erro ao listar noticias: " + _err)
            }

        }

        listarCategorias();

    }, []);

    return (
        <div>



            <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{ paddingTop: 30 }}
            >

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}
                    container
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    style={{ height: 2, backgroundColor: 'green' }}
                >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}
                    container
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    style={{ paddingTop: 30 , paddingBottom: 30}}
                >

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{ borderRadius: '10px', backgroundColor: '#D3D3D3' }}
                        >
                            <p style={{ marginLeft: 30, marginRight: 30, paddingTop: 30 }}>
                                <span style={{ fontSize: 22, fontWeight: 'bold' }}> Sobre o Blog:</span>
                            </p>
                            <p style={{ marginLeft: 30, marginRight: 30 }}>
                                <p style={{ fontSize: 22 }}> No Blog da <span  style={{ fontSize: 26, fontWeight: 'bold' }}> titaniwm</span>, mantenha se informado com as principais notícias do mundo da tecnologia.
                                    Saiba também tudo o que aconteça nos bastidores da nossa softhouse.</p>
                            </p>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{ paddingBottom: 20, paddingTop: 10 }}
                        >
                            <span style={{ margin: 10, fontSize: 22, fontWeight: 'bold' }}> Categorias </span>
                            <br></br>
                        </Grid>
                        {
                            categorias.map((categoria) => (
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                key = {categoria.id_categoria}
                                    direction="column"
                                    container
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    style={{ marginLeft: 20 }}
                                >
                                    <a style={{ fontSize: 22, fontWeight: 'bold' }} href={"/noticias/" + categoria.nome_categoria}> {categoria.nome_categoria} </a>
                                </Grid>

                            ))

                        }

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                    </Grid>

                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

            </Grid>

        </div >

    )
}
export default RodapeBlog;