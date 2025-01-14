export function useModal(name: string) {
    const getEl = () => {
        const el = document.getElementById(name);

        if (el && el instanceof HTMLDialogElement) {
            return el;
        } else {
            throw new Error('element does not exist');
        }
    };

    return {
        open: () => {
            getEl().showModal();
        },
        close: () => {
            getEl().close();
        },
    };
}
