import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  FormHelperText,
  Paper,
} from "@mui/material";

const DynamicForm = ({ formConfig, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: "",
      }));
    }
  };

  const validateField = (field, value) => {
    const { validation = {}, required } = field;

    // Check required
    if (required && (!value || value.toString().trim() === "")) {
      return `${field.label} is required`;
    }

    if (!value) return "";

    // Check minLength
    if (validation.minLength && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    // Check maxLength
    if (validation.maxLength && value.length > validation.maxLength) {
      return `${field.label} must not exceed ${validation.maxLength} characters`;
    }

    // Check for email
    if (validation.pattern) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        return `Please enter a valid ${field.label.toLowerCase()}`;
      }
    }

    // Check date range
    if (field.type === "date") {
      if (validation.min && value < validation.min) {
        return `Date must be after ${validation.min}`;
      }
      if (validation.max && value > validation.max) {
        return `Date must be before ${validation.max}`;
      }
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    // Validate all fields
    formConfig.fields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(formData);
      // Reset form
      setFormData({});
    }
  };

  //   fields are dynamically render
  const renderField = (field) => {
    const value = formData[field.id] || "";
    const error = errors[field.id];

    switch (field.type) {
      case "select":
        return (
          <FormControl fullWidth error={!!error} key={field.id}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              label={field.label}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case "date":
        return (
          <TextField
            key={field.id}
            fullWidth
            type="date"
            label={field.label}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            error={!!error}
            helperText={error}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: field.validation?.min,
              max: field.validation?.max,
            }}
          />
        );

      default:
        return (
          <TextField
            key={field.id}
            fullWidth
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            error={!!error}
            helperText={error}
            inputProps={{
              minLength: field.validation?.minLength,
              maxLength: field.validation?.maxLength,
            }}
          />
        );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        {formConfig.title}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {formConfig.fields.map(renderField)}

          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default DynamicForm;
