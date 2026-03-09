import MenuItemModel from "../../components/menuItem/MenuItemModel.jsx";
import MenuItemTable from "../../components/menuItem/MenuItemTable";
import {
  useGetMenuItemsQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} from "../../store/api/menuItemApi.js";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function MenuManagement() {
  const {
    data: menuItems = [],
    isLoading,
    error,
    refetch,
  } = useGetMenuItemsQuery();

  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  // console.log("Menu Items:", menuItems);

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    specialTag: "",
    image: null,
  });
  // arrow function to reset form data at MenuItemModel
  const resetFormData = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      specialTag: "",
      image: null,
    });
  };

  const handleDeleteMenuItem = async (item) => {
    // sweet alert for delete confirmation
    const resultSwal = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (resultSwal.isConfirmed) {
      const result = await deleteMenuItem(item.id);

      Swal.fire({
        title: "Deleted!",
        text: "Menu item has been deleted.",
        icon: "success",
      });
    }
  };

  const handleAddMenuItem = async (item) => {
    resetFormData();
    setSelectedMenuItem(null);
    setShowModal(true);
  };

  const handleEditMenuItem = async (item) => {
    setSelectedMenuItem(item);
    resetFormData();
    setFormData({
      name: item.name || "",
      description: item.description || "",
      category: item.category || "",
      price: item.price || "",
      specialTag: item.specialTag || "",
      image: null,
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      //Api call to create menu item
      console.log("Form Data Submitted:", formData);

      const formDataToSend = new FormData(); // special web API object for handeling form data including files
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Description", formData.description);
      formDataToSend.append("Category", formData.category);
      formDataToSend.append("Price", formData.price);
      formDataToSend.append("SpecialTag", formData.specialTag);
      if (formData.image) {
        formDataToSend.append("File", formData.image);
      }

      if (selectedMenuItem) {
        formDataToSend.append("Id", selectedMenuItem.id);
      }

      let result;

      if (selectedMenuItem) {
        result = await updateMenuItem({
          id: selectedMenuItem.id,
          formData: formDataToSend,
        });
        console.log("Menu Item Updated:", result);
        if (result.isSuccess !== false) {
          toast.success("Menu item updated successfully!");
          refetch();
        } else {
          toast.error("Failed to update menu item!");
        }
      } else {
        result = await createMenuItem(formDataToSend);
        console.log("Menu Item Created:", result);
        if (result.isSuccess !== true) {
          console.log("Error creating menu item:", result.error);
          toast.success("Menu item added successfully!");
          refetch();
        } else {
          toast.error("Failed to add menu item!");
        }
      }
    } catch (error) {
      console.log("Error adding/updating menu item:", error);
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
      resetFormData();
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log("Input Change:", name, value);
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value })); // name refers to the input field name from e.target
    }
  };

  return (
    <div className="container-fluid p-4 mx-3">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Menu Item Management</h2>
              <p className="text-muted mb-0">
                Manage your restaurant's menu items
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleAddMenuItem}>
              <i className="bi bi-plus-circle me-2"></i>
              Add Menu Item
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <MenuItemTable
                menuItems={menuItems}
                isLoading={isLoading}
                error={error}
                onDelete={handleDeleteMenuItem}
                onEdit={handleEditMenuItem}
              />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <MenuItemModel
          formData={formData}
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
          onChange={handleInputChange}
          isEditing={!!selectedMenuItem} // note double exclamation to convert to boolean
        />
      )}
    </div>
  );
}
export default MenuManagement;
