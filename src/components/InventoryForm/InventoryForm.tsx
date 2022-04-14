import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseMake, chooseModel, chooseYear, chooseMileage } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

interface InventoryFormProps {
    id?:string;
    data?:{}
}

interface InventoryState {
    make: string;
    model: string;
    year: string;
    mileage: string;
}

export const InventoryForm = (props:InventoryFormProps) => {

    const dispatch = useDispatch(); 
    const store = useStore();
    const make = useSelector<InventoryState>(state => state.make);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            dispatch(chooseMake(data.make));
            dispatch(chooseModel(data.model));
            dispatch(chooseYear(data.year));
            dispatch(chooseMileage(data.mileage));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Car Make</label>
                    <Input {...register('make')} name="make" placeholder='Make'/>
                </div>
                <div>
                    <label htmlFor="model">Car Model</label>
                    <Input {...register('model')} name="model" placeholder='Model'/>
                </div>
                <div>
                    <label htmlFor="year">Year Made</label>
                    <Input {...register('year')} name="year" placeholder='Year'/>
                </div>
                <div>
                    <label htmlFor="mileage">Mileage</label>
                    <Input {...register('mileage')} name="mileage" placeholder='Mileage'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}