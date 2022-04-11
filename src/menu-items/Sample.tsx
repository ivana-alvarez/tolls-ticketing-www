// third-party
import { FormattedMessage } from 'react-intl'

// assets

import ResumenIcon from '../components/icons/ResumenIcon'
import CategoriasIcon from '../components/icons/CategoriasIcon'
import PeajesIcon from '../components/icons/PeajesIcon'
import TagSaleIcon from '../components/icons/TagSaleIcon'
import cuentasIcon from '../components/icons/cuentasIcon'
import ReportIcon from '../components/icons/ReportIcon'
import MantenimientoIcon from '../components/icons/MantenimientoIcon'
// constant
const icons = {
    ResumenIcon,
    CategoriasIcon,
    PeajesIcon,
    TagSaleIcon,
    cuentasIcon,
    ReportIcon,
    MantenimientoIcon,
}

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const Sample = {
    id: 'main',
    type: 'group',
    children: [
        {
            id: 'Resumen',
            title: <FormattedMessage id="Resumen" />,
            type: 'item',
            url: '/',
            icon: icons.ResumenIcon,
            breadcrumbs: false,
        },
        {
            id: 'Peajes',
            title: <FormattedMessage id="Gestión de peajes" />,
            type: 'item',
            url: '/peajes',
            icon: icons.PeajesIcon,
            breadcrumbs: false,
        },
        {
            id: 'Gestión de Tarifas',
            title: <FormattedMessage id="Gestión de Tarifas" />,
            type: 'collapse',
            // url: '/tarifas',
            icon: icons.CategoriasIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'Gestión de Categoría',
                    title: <FormattedMessage id="Gestión de Categoría" />,
                    type: 'item',
                    url: '/categorias',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
                {
                    id: 'Gestión de Tarifas',
                    title: <FormattedMessage id="Gestión de Tarifa" />,
                    type: 'item',
                    url: '/tarifas',
                    // icon: icons.CategoriasIcon,
                    breadcrumbs: false,
                },
            ],
        },

        {
            id: 'Gestión de soporte',
            title: <FormattedMessage id="Gestión de soporte" />,
            type: 'item',
            url: '/ventaTag',
            icon: icons.TagSaleIcon,
            breadcrumbs: false,
        },
        {
            id: 'Gestión de Cuentas',
            title: <FormattedMessage id="Gestión de Cuentas" />,
            type: 'item',
            url: '/gestion-de-cuentas',
            icon: icons.cuentasIcon,
            breadcrumbs: false,
        },

        {
            id: 'Reportes',
            title: <FormattedMessage id="Reportes" />,
            type: 'item',
            url: '/reportes',
            icon: icons.ReportIcon,
            breadcrumbs: false,
        },

        // {
        //     id: 'Mantenimiento',
        //     title: <FormattedMessage id="Mantenimiento" />,
        //     type: 'item',
        //     url: '/mantenimiento',
        //     icon: icons.MantenimientoIcon,
        //     breadcrumbs: false,
        // },
    ],
}

export default Sample
