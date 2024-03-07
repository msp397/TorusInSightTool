import { typeOptions } from "@/Datatable/data";
import { capitalize } from "@/Datatable/utils";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

const DatasettingModal = ({ onClose }: any) => {
  const [post, setPost] = React.useState({
    key: "",
    type: "",
    value: "",
    valueType: "",
    jsonContent: "",
    restValues: {},
  });
  const [count, setCount] = useState([1]);
  const handleClick = () => {
    const arr = [...count];
    const max = count[count.length - 1] + 1;
    arr.push(max);
    setCount(arr);
  };
  const handleRestValueChange = (e: any) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      restValues: {
        ...prevPost.restValues,
        [name]: value,
      },
    }));
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-2 ">
      <div className="flex flex-row gap-2 w-full justify-center items-center p-2  ">
        <Input
          autoFocus
          id="key"
          label="key"
          placeholder="Enter your key"
          variant="bordered"
          onChange={(e) => setPost({ ...post, key: e.target.value })}
        />
      </div>
      <div className="flex flex-row gap-2 w-full justify-center items-center p-2 ">
        <Select
          items={typeOptions}
          label="type"
          placeholder="Type"
          className="max-w-xs"
          onChange={(e) => setPost({ ...post, valueType: e.target.value })}
        >
          {(item) => (
            <SelectItem key={item.uid}>{capitalize(item.name)}</SelectItem>
          )}
        </Select>
      </div>
      {post.valueType === "string" && (
        <div className="">
          <Textarea
            id="value"
            onChange={(e) => setPost({ ...post, value: e.target.value })}
            className="text-right"
          >
            Value
          </Textarea>
        </div>
      )}
      {post.valueType === "json" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Textarea
            id="jsonContent"
            onChange={(e) => setPost({ ...post, jsonContent: e.target.value })}
            className="text-right"
          >
            JSON Content
          </Textarea>
        </div>
      )}
      {["hash", "stream"].includes(post.valueType) && (
        <div className="flex flex-col">
          <div>
            {count.map((item) => (
              <div className="flex justify-center w-[90%] gap-2 p-1" key={item}>
                <Input
                  className="w-1/2"
                  type="text"
                  name={`key${item}`}
                  onChange={handleRestValueChange}
                  placeholder={`Enter value for key${item}`}
                />
                <Input
                  className="w-1/2"
                  type="text"
                  name={`value${item}`}
                  onChange={handleRestValueChange}
                  placeholder={`Enter value for value${item}`}
                />
              </div>
            ))}
          </div>
          <Button onClick={handleClick}> Add Column </Button>
        </div>
      )}
      {["graph", "list", "set", "sorted-set"].includes(post.valueType) && (
        <div className="flex flex-col">
          <div>
            {count.map((item) => (
              <div className="flex justify-center w-[90%] gap-2 p-1" key={item}>
                <Input
                  type="text"
                  name={`value${item}`}
                  onChange={handleRestValueChange}
                  placeholder={`Enter value for value${item}`}
                />
              </div>
            ))}
          </div>
          <Button onClick={handleClick}> Add Column </Button>
        </div>
      )}
      <Button color="primary">Save</Button>
    </div>
  );
};

export default DatasettingModal;
