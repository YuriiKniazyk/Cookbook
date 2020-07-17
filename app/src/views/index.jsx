import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";

import { RecipeApi } from "../api";
import Modal from "./EditRecipe";
import Version from "./VersionRecipe";
import NewRecipe from "./NewRecipe";

export default function NestedTable() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      width: 400,
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 500,
    },
    {
      title: "",
      key: "action",
      render: (id) => <a onClick={getVersion.bind(this, id)}>Version</a>,
    },
    {
      title: "",
      key: "action",
      render: (id) => <a onClick={deleteRecipe.bind(this, id)}>Delete</a>,
    },
    {
      title: "",
      key: "action",
      render: (id) => <a onClick={showModal.bind(this, id)}>Edit</a>,
    },
  ];

  const [recipe, setRecipe] = useState();
  const [recipeV, setRecipeV] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleV, setVisibleV] = useState(false);
  const [visibleN, setVisibleN] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    recipeList();
  }, []);

  async function recipeList() {
    const { data } = await RecipeApi.query({ sort: "DESC" });
    setRecipe(data.recipe);
  }

  async function deleteRecipe(id) {
    await RecipeApi.delete(id.id);
    recipeList();
  }

  async function getVersion(id) {
    const recipeVersion = await RecipeApi.get(id.id);
    setRecipeV(recipeVersion.data.recipe);
    setVisibleV(true);
  }

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = (id) => {
    setVisible(true);
    setId(id)
  };

  const handleCancelV = () => {
    setVisibleV(false);
  };

  const handleCancelN = () => {
    setVisibleN(false);
  };

  
  const data = recipe
    ? recipe.map((items) => {
        return {
          key: items.id,
          id: items.id,
          created_at: new Date(items.created_at).toDateString(),
          description: items.description,
        };
      })
    : null;

  return (
    <>
      {visible ? <Modal visible={visible} handleCancel={handleCancel} recipeList={recipeList} id={id} /> : null}
      {visibleV ? <Version visible={visibleV} handleCancel={handleCancelV} recipeV={recipeV} /> : null}
      {visibleN ? <NewRecipe visible={visibleN} handleCancel={handleCancelN} recipeList={recipeList} /> : null}
      <Button type="primary" onClick={()=>{setVisibleN(true)}}>New Recipe</Button>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={data}
      />
    </>
  );
}
