import React, { useEffect, useState } from 'react'

import { ColorCard } from './ColorCard/ColorCard'
import { HexColors } from '../interfaces/Interface';
import axios from 'axios';

const { v4: uuidv4 } = require('uuid');

const getColors = async () => {
    return await axios.get(
        `https://parseapi.back4app.com/classes/Color?limit=10`,
        {
            headers: {
                'X-Parse-Application-Id': 'vei5uu7QWv5PsN3vS33pfc7MPeOPeZkrOcP24yNX', // This is the fake app's application id
                'X-Parse-Master-Key': 'aImLE6lX86EFpea2nDjq9123qJnG0hxke416U7Je', // This is the fake app's readonly master key
            }
        }
    )
}


export const ColorContainer = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [hexColors, setHexColors] = useState<HexColors[]>([])

    useEffect(() => {
        setTimeout(() => {
            getColors()
                .then(response => {
                    const data = response.data.results;
                    data.map(({ objectId, name, hexCode }: any) => {
                        setHexColors(prevColors => [...prevColors, {
                            id: objectId,
                            colorName: name,
                            hexFormat: hexCode
                        }])
                        // console.log(objectId, name, hexCode);
                    })


                })
            setIsLoading(false)
        }, 500)
    }, [])


    return (
        <React.Fragment>
            {
                isLoading ? <h1>Loading colors...</h1> :
                    <article className='card-container'>
                        {
                            hexColors.map(({ id, colorName, hexFormat }) => {
                                return <ColorCard key={id + uuidv4()} colorInfo={{ hexFormat, colorName }} />
                            })
                        }
                    </article>

            }
        </React.Fragment>
    )
}