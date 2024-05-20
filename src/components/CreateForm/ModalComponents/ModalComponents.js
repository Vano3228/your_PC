import axios from "axios";
import {useEffect, useState} from "react";
import ComponentItem from "../../ComponentItem/ComponentItem";
import './ModalComponents.scss';

function ModalComponents({type, open, onClose, configPC, setConfigPC, handleComponentSelect}) {
    const componentName = {
        cpu: 'Выбор процессора',
        gpu: 'Выбор видеокарты',
        ram: 'Выбор оперативной памяти',
        motherboard: 'Выбор материнской платы',
        power_supply: 'Выбор блока питания',
        cooler: 'Выбор кулера',
        pc_case: 'Выбор корпуса',
        hard_drive: 'Выбор жёсткого диска'
    };

    const [fetchComponents, setFetchComponents] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const getAllComponents = async () => {
            const compatibilityObj = {
                cpu: (type === 'cpu') && {
                    motherboard_socket: configPC.hasOwnProperty('motherboard') && configPC.motherboard['socket'],
                    cooler_socket: configPC.hasOwnProperty('cooler') && configPC.cooler['socket'],
                    cooler_tdp: configPC.hasOwnProperty('cooler') && configPC.cooler['tdp'],
                    ram_memory_type: configPC.hasOwnProperty('ram') && configPC.ram['memory_type']
                },
                gpu: (type === 'gpu') && {
                    power_supply_power: configPC.hasOwnProperty('power_supply') && configPC.power_supply['power'],
                    pc_case_length: configPC.hasOwnProperty('pc_case') && configPC.pc_case['gpu_max_length']
                },
                ram: (type === 'ram') && {
                    motherboard_ram_type: configPC.hasOwnProperty('motherboard') && configPC.motherboard['ram_type'],
                    cpu_ram_type: configPC.hasOwnProperty('cpu') && configPC.cpu['ram_type']
                },
                power_supply: (type === 'power_supply') && {
                    gpu_recommended_psu: configPC.hasOwnProperty('gpu') && configPC.gpu['recommended_psu']
                },
                pc_case: (type === 'pc_case') && {
                    motherboard_size_type: configPC.hasOwnProperty('motherboard') && configPC.motherboard['size_type'],
                    gpu_length: configPC.hasOwnProperty('gpu') && configPC.gpu['length'],
                    cooler_height: configPC.hasOwnProperty('cooler') && configPC.cooler['height']
                },
                hard_drive: (type === 'hard_drive') && {
                    motherboard_m2_slots: configPC.hasOwnProperty('motherboard') && configPC.motherboard['m2_slots']
                },
                motherboard: (type === 'motherboard') && {
                    cpu_socket: configPC.hasOwnProperty('cpu') && configPC.cpu['socket'],
                    cooler_socket: configPC.hasOwnProperty('cooler') && configPC.cooler['socket'],
                    pc_case_mb_types: configPC.hasOwnProperty('pc_case') && configPC.pc_case['mb_types'],
                    hard_drive_interface: configPC.hasOwnProperty('hard_drive') && configPC.hard_drive['interface'],
                    ram_memory_type: configPC.hasOwnProperty('ram') && configPC.ram['memory_type']
                },
                cooler: (type === 'cooler') && {
                    cpu_socket: configPC.hasOwnProperty('cpu') && configPC.cpu['socket'],
                    cpu_tdp: configPC.hasOwnProperty('cpu') && configPC.cpu['tdp'],
                    motherboard_socket: configPC.hasOwnProperty('motherboard') && configPC.motherboard['socket'],
                    pc_case_cooler_max_height: configPC.hasOwnProperty('pc_case') && configPC.pc_case['cooler_max_height']
                }
            };
            const src = `http://localhost:5000/api/components/all`;
            const compatibilityComponentsReq = await axios.post(src, {type, ...compatibilityObj[type]});
            if (compatibilityComponentsReq.data !== []) {
                setFetchComponents(compatibilityComponentsReq.data);
            }
        };
        getAllComponents();
    }, [type, configPC]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredComponents = fetchComponents.filter(component =>
        component.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            {open &&
                <div
                    className={`modal-components`}
                    onClick={() => onClose(false)}
                >
                    <div className={`content`} onClick={(e) => e.stopPropagation()}>
                        <h2>
                            {componentName[type]}
                        </h2>
                        <input
                            type="text"
                            value={filter}
                            onChange={handleFilterChange}
                            placeholder="Поиск по названию"
                            className="filter-input"
                        />
                        <div className='components'>
                            {filteredComponents.length !== 0 ? filteredComponents.map((el, i) => (
                                <ComponentItem key={i} type={type} component={el} onSelect={handleComponentSelect}/>
                            )) :
                            <p style={{textAlign: 'center'}}>Подходящих комплектующих не найдено</p>}
                        </div>
                        {configPC.hasOwnProperty(type) && (
                            <button className='clean-button' type='button' onClick={() => {
                                const deletedConfigPC = {...configPC};
                                deletedConfigPC.pc_price -= deletedConfigPC[type].price;
                                delete deletedConfigPC[type];
                                setConfigPC(deletedConfigPC);
                                onClose();
                            }}>Очистить выбор</button>
                        )}
                    </div>
                </div>
            }
        </>
    );
}

export default ModalComponents;
