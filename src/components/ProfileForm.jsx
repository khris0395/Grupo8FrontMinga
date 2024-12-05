export default function ProfileForm () {


    return(
        <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      {/* Formulario */}
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="profileImage"
          placeholder="URL Profile Image"
          value={formData.profileImage}
          onChange={handleChange}
        />
        <button onClick={handleSave} style={{ backgroundColor: "green", color: "white" }}>
          Save
        </button>
        <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
          Delete Account
        </button>
      </div>

      {/* Vista previa */}
      <div style={{ textAlign: "center" }}>
        <img
          src={formData.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          style={{ width: "150px", borderRadius: "50%" }}
        />
        <h2>
          {formData.firstName} {formData.lastName}
        </h2>
        <p>{formData.location}</p>
        <p>{formData.birthDate}</p>
      </div>
    </div>
    )
}