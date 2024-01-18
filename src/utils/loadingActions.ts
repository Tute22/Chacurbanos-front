import {
    setLoginLoading,
    setRegisterLoading,
    setGetPackagesLoading,
    setDeclarationLoading,
    setCreateUserLoading,
    setStartWorkLoading,
    setIsLoading,
} from '@/store/slice/isLoading/loadingSlice'

export const loadingActions: Record<string, (payload: boolean) => any> = {
    ['loginLoading']: setLoginLoading,
    ['registerLoading']: setRegisterLoading,
    ['getPackagesLoading']: setGetPackagesLoading,
    ['declarationLoading']: setDeclarationLoading,
    ['createUserLoading']: setCreateUserLoading,
    ['startWorkLoading']: setStartWorkLoading,
    ['isLoading']: setIsLoading,
}
