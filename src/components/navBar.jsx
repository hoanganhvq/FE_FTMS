import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from "./logo";

const navigation = [
    { name: 'Trang chủ', href: '/Home', current: false },
    { name: 'Giải đấu', href: '/tournaments', current: false },
    { name: 'Câu lạc bộ', href: '/clubs', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const [currentItem, setCurrentItem] = useState(null);

    const handleClick = (item) => {
        const updatedNavigation = navigation.map((navItem) => ({
            ...navItem,
            current: navItem.name === item.name, // Set current to true for the clicked item
        }));
        setCurrentItem(item.name);
        // Update the navigation array with the new values
        navigation.splice(0, navigation.length, ...updatedNavigation);
    };

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-between">
                                <div className="flex-shrink-0">
                                    <Link to="/Home">
                                        <Logo />
                                    </Link>
                                </div>
                                <div className="flex items-center justify-end flex-1">
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4 items-center">
                                            {navigation.map((item) => (
                                                <div key={item.name} className="flex items-center">
                                                    {item.name === 'Giải đấu' || item.name === 'Câu lạc bộ' ? (
                                                        <Menu as="div" className="relative">
                                                            <Menu.Button
                                                                className={classNames(
                                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Menu.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <Link
                                                                                to={item.href}
                                                                                className={classNames(
                                                                                    active ? 'bg-gray-600' : '',
                                                                                    'block px-4 py-2 text-sm text-white'
                                                                                )}
                                                                            >
                                                                                {item.name}
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                    {item.name === 'Giải đấu' && (
                                                                        <>
                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <Link
                                                                                        to="/new-tournament"
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-600' : '',
                                                                                            'block px-4 py-2 text-sm text-white'
                                                                                        )}
                                                                                    >
                                                                                        Tạo giải đấu
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <Link
                                                                                        to="/tournaments-list"
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-600' : '',
                                                                                            'block px-4 py-2 text-sm text-white'
                                                                                        )}
                                                                                    >
                                                                                        Quản lý giải đấu
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </>
                                                                    )}
                                                                    {item.name === 'Câu lạc bộ' && (
                                                                        <>
                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <Link
                                                                                        to="/new-club"
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-600' : '',
                                                                                            'block px-4 py-2 text-sm text-white'
                                                                                        )}
                                                                                    >
                                                                                        Tạo câu lạc bộ
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <Link
                                                                                        to="/manage-clubs"
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-600' : '',
                                                                                            'block px-4 py-2 text-sm text-white'
                                                                                        )}
                                                                                    >
                                                                                        Quản lý câu lạc bộ
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </>
                                                                    )}
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    ) : (
                                                        <Link
                                                            onClick={() => handleClick(item)}
                                                            to={item.href}
                                                            className={classNames(
                                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex items-center">
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                        />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(active ? 'bg-gray-600' : '', 'block px-4 py-2 text-sm text-white')}
                                                                >
                                                                    Your Profile
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(active ? 'bg-gray-600' : '', 'block px-4 py-2 text-sm text-white')}
                                                                >
                                                                    Settings
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(active ? 'bg-gray-600' : '', 'block px-4 py-2 text-sm text-white')}
                                                                >
                                                                    Sign out
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                            <span className="text-white ml-2">Tên Account</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}