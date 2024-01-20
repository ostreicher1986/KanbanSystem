import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import { SkeletonStyle } from '../../../layout/styles/skeletonRouters';

const SkeletonRouters: React.FC = () => {

    return (
        <div className="custom-skeleton p-p-4">
            <SkeletonStyle><Skeleton className="skeletonColor" height="5rem"></Skeleton></SkeletonStyle>
            <br />
            <SkeletonStyle><Skeleton className="skeletonColor" height="3rem"></Skeleton></SkeletonStyle>
            <br />
            <SkeletonStyle><Skeleton className="skeletonColor" width="100%" height="150px"></Skeleton></SkeletonStyle>
        </div>
    )

};

export default SkeletonRouters;