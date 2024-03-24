type SkeletonLoadingProps = {
    showValue: string;
    loadingState: boolean;
    loadingValue: string;
}

const SkeletonLoading = ({ showValue, loadingState, loadingValue }: SkeletonLoadingProps) => {
    return (
        <div>
            {loadingState ? (
                <div className="text-gray-400 text-center blur-sm">{loadingValue}</div>
            ) : (
                showValue
            )}
        </div>
    );
}

export default SkeletonLoading;
