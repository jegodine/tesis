import React, { useState } from "react";
import { CheckBox } from '@rneui/themed';
import { View } from "react-native";

const RadioItem = ({ item, selectedIndex, setIndex, setValue }) => {
    const { title, value } = item;
    return (
        <CheckBox
            checked={selectedIndex === value}
            title={title}
            onPress={() => { setIndex(0); setValue(value); setIndex(value) }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
        />

    );
};

const RadioOptions = ({ setValue, values }) => {
    const [selectedIndex, setIndex] = useState(0);
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row'
        }}>
            {values.map((item, index) => <RadioItem key={index} item={item} setIndex={setIndex} selectedIndex={selectedIndex} setValue={setValue} />)}
        </View>
    );
}

export default RadioOptions;