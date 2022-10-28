import './ColorCard.modules.css'

import { CardProps } from '../../interfaces/Interface';
import Swal from 'sweetalert2';

const handleCardClick = async (hexColor: string, colorName: string) => {
    await navigator.clipboard.writeText(hexColor);
    Swal.fire({
        title: 'Congrats!',
        text: `You have copied ${colorName} to clipboard`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
}

export const ColorCard = (props: CardProps) => {
    const { hexFormat, colorName } = props.colorInfo
    return (
        <section className="card" id='ColoredCard' style={{ background: hexFormat }}>
            <div className="card-body" onClick={() => handleCardClick(hexFormat, colorName)
            }>
                <h3 className="card-title">{hexFormat}</h3>
            </div>
        </section>
    )
}
