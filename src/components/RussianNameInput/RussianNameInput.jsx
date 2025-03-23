import React, {useEffect, useState} from 'react';
import {Input, Checkbox} from 'antd';

const RussianNameInput = ({ value, onChange, ...restProps }) => {
    const [hasPatronymic, setHasPatronymic] = useState(true); // Состояние чекбокса
    const [ev, setEv] = useState(null);

    const validateRussianName = (value) => {
        const russianNameRegex = /^[А-Яа-яЁё\s-]+$/;
        const parts = value.split(' ');

        // Если отчество есть, проверяем, что ФИО состоит из трёх частей
        if (hasPatronymic && (!value || parts.length !== 3)) {
            return 'Пожалуйста, введите ФИО в формате: Фамилия Имя Отчество';
        }

        // Если отчества нет, проверяем, что ФИО состоит из двух частей
        if (!hasPatronymic && (!value || parts.length !== 2)) {
            return 'Пожалуйста, введите ФИО в формате: Фамилия Имя';
        }

        // Проверяем, что введённые символы соответствуют русскому алфавиту
        if (!russianNameRegex.test(value)) {
            return 'Пожалуйста, используйте только русские буквы, пробелы и дефисы';
        }

        return null; // Ошибок нет
    };

    const handleChange = (ev) => {
        const inputValue = ev.target.value;
        const error = validateRussianName(inputValue);
        setEv(ev);

        // Вызываем onChange, передавая значение и ошибку (если есть)
        onChange(ev, error); // Передаём событие, чтобы сохранить совместимость
    };

    useEffect(() => {
        if (!ev) {
            return;
        }
        handleChange(ev);
    }, [hasPatronymic]);

    return (
        <div>
            <Input
                value={value}
                onChange={handleChange}
                {...restProps} // Передаём остальные пропсы
            />
            <Checkbox
                checked={!hasPatronymic} // Инвертируем значение, так как чекбокс означает "нет отчества"
                onChange={(e) => setHasPatronymic(!e.target.checked)}
                style={{ marginTop: 8 }}
            >
                Нет отчества
            </Checkbox>
        </div>
    );
};

export default RussianNameInput;