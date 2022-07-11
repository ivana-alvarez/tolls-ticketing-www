import React from 'react'
import ReadVehicleAssociate from './ReadVehicleAssociate'
import AssociateVehicleProfile from './AssociateVehicleProfile'

interface laneTableProps {
    readOnly?: boolean
    onlyView?: boolean
    tollData?: any
    add?: boolean
    following?: boolean
    vehiclesData?: any
    userId?: string
    isCompany?: boolean
}

const VehiclesIndex = ({ vehiclesData, userId, isCompany }: laneTableProps) => {
    const [editVehicle, setEditVehicle] = React.useState(false)
    const [dataVehicle, setDataVehicle] = React.useState({})
    const [neww, setNeww] = React.useState(false)
    // const [selectedVehicleId, setSelectedVehicleId] = React.useState('')

    const handleEditVolver = () => {
        setEditVehicle(!editVehicle)
    }
    const handleEditVehicle = (e) => {
        setEditVehicle(!editVehicle)
        const id = e.currentTarget.dataset.id
        const data = vehiclesData.find((find) => find.id === id)
        setDataVehicle(data)
    }

    const handleCreateNew = (boo) => {
        setNeww(boo)
    }
    const editNue = () => {}

    return (
        <>
            {!editVehicle && !neww ? (
                <ReadVehicleAssociate
                    vehiclesData={vehiclesData}
                    handleEditVehicle={handleEditVehicle}
                    editNew={editNue}
                    handleCreateNew={handleCreateNew}
                    userId={userId}
                />
            ) : (
                <AssociateVehicleProfile
                    readOnly={editVehicle}
                    handleEditVehicle={handleEditVolver}
                    handleCreateNew={handleCreateNew}
                    handleEditVolver={handleEditVolver}
                    dataVehicle={dataVehicle}
                    userId={userId}
                    setEditVehicle={setEditVehicle}
                    setNeww={setNeww}
                    isCompany={isCompany}
                />
            )}
        </>
    )
}

export default VehiclesIndex
