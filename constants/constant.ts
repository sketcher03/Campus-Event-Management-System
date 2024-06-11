export const navItemsPrivilege = [
    {
        label: 'Home',
        route: '/',
    },
    {
        label: 'Propose Event',
        route: '/event/propose',
    },
    {
        label: 'Browse Events',
        route: '/event/browse',
    },
    {
        label: 'My Profile',
        route: '/profile',
    },
]

export const navItemsGeneral = [
    {
        label: 'Home',
        route: '/',
    },
    {
        label: 'Browse Events',
        route: '/event/browse',
    },
    {
        label: 'My Profile',
        route: '/profile',
    },
]

export const roles = [
    {
        label: 'admin',
        description: 'Admin',
    },
    {
        label: 'organizer',
        description: 'Organizer',
    },
    {
        label: 'student',
        description: 'Student',
    },
    {
        label: 'faculty',
        description: 'Faculty',
    },
    {
        label: 'staff',
        description: 'Staff',
    },
]

export const eventInitialValues = {
    title: '',
    description: '',
    venue: '',
    host: '',
    dpImage: '',
    image: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    organizerId: '',
    price: '',
    isFree: false,
    url: '',
}