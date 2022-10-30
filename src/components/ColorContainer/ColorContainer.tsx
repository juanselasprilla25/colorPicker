import React, { useEffect, useState } from 'react'

import { ColorCard } from '../ColorCard/ColorCard'
import { HexColors } from '../../interfaces/Interface';
import axios from 'axios';

const { v4: uuidv4 } = require('uuid');

export const ColorContainer = () => {

    const REACT_APP_ID: string | undefined = process.env.REACT_APP_ID
    const REACT_APP_MASTER_KEY: string | undefined = process.env.REACT_APP_MASTER_KEY
    const [isLoading, setIsLoading] = useState(true);
    const [hexColors, setHexColors] = useState<HexColors[]>([])

    useEffect(() => {
        let isCancelled = false
        axios.get(
            `https://parseapi.back4app.com/classes/Color?limit=50`,
            {
                headers: {
                    'X-Parse-Application-Id': REACT_APP_ID, // This is the fake app's application id
                    'X-Parse-Master-Key': REACT_APP_MASTER_KEY, // This is the fake app's readonly master key
                }
            }
        )
            .then(response => {
                if (!isCancelled) {

                    const resultData = response.data.results;
                    resultData.map(({ objectId, name, hexCode }: any) => {
                        setHexColors(prevColors => [...prevColors, {
                            id: objectId,
                            colorName: name,
                            hexFormat: hexCode
                        }])
                    })
                    setIsLoading(false)
                }
            })
            .catch(error => {
                setHexColors([])
                setIsLoading(true)
            })

        return () => {
            isCancelled = true
        }
    }, [])

    return (
        <React.Fragment>
            {
                isLoading
                    ? <h1>Loading colors...</h1>
                    : <article className='card-container'>
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