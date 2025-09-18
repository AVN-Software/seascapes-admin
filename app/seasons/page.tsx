"use client";
import { SeasonForm } from "@/components/forms/SeasonsForm";
import { Season } from "@/types/rates";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const SeasonsManagement = () => {
  const [seasons, setSeasons] = useState<Season[]>([
    {
      id: "1",
      name: "Holiday Peak",
      date_ranges: [
        {
          start_date: "2024-12-15",
          end_date: "2025-01-15",
        },
      ],
      minimum_stay: 7,
      priority: 1,
      active: true,
      start_date: "",
      end_date: "",
    },
    {
      id: "2",
      name: "Festive",
      date_ranges: [
        {
          start_date: "2024-12-20",
          end_date: "2025-01-05",
        },
      ],
      minimum_stay: 5,
      priority: 2,
      active: true,
      start_date: "",
      end_date: "",
    },
    {
      id: "3",
      name: "Standard",
      date_ranges: [
        {
          start_date: "2024-01-01",
          end_date: "2024-12-31",
        },
      ],
      minimum_stay: 1,
      priority: 3,
      active: true,
      start_date: "",
      end_date: "",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<
    Omit<Season, "start_date" | "end_date">
  >({
    id: "",
    name: "Standard",
    date_ranges: [
      {
        start_date: "",
        end_date: "",
      },
    ],
    minimum_stay: 1,
    priority: 1,
    active: true,
  });

  const seasonOptions: Season["name"][] = [
    "Standard",
    "Holiday Peak",
    "Festive",
  ];

  const handleEdit = (season: Season) => {
    setEditingId(season.id);
    setFormData({
      id: season.id,
      name: season.name,
      date_ranges: [...season.date_ranges], // Create a copy
      minimum_stay: season.minimum_stay,
      priority: season.priority,
      active: season.active,
    });
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing season
      setSeasons(
        seasons.map((season: Season) =>
          season.id === editingId
            ? { ...season, ...formData, updated_at: new Date().toISOString() }
            : season
        )
      );
      setEditingId(null);
    } else {
      // Create new season
      const newSeason: Season = {
        ...formData,
        id: Date.now().toString(),
        start_date: "",
        end_date: "",
      };
      setSeasons([...seasons, newSeason]);
      setIsCreating(false);
    }

    // Reset form
    setFormData({
      id: "",
      name: "Standard",
      date_ranges: [
        {
          start_date: "",
          end_date: "",
        },
      ],
      minimum_stay: 1,
      priority: 1,
      active: true,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      id: "",
      name: "Standard",
      date_ranges: [
        {
          start_date: "",
          end_date: "",
        },
      ],
      minimum_stay: 1,
      priority: 1,
      active: true,
    });
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this season? This will affect all rate plans using this season."
      )
    ) {
      setSeasons(seasons.filter((season: Season) => season.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setSeasons(
      seasons.map((season: Season) =>
        season.id === id
          ? {
              ...season,
              active: !season.active,
              updated_at: new Date().toISOString(),
            }
          : season
      )
    );
  };

  const sortedSeasons = [...seasons].sort((a, b) => a.priority - b.priority);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Seasons Management
              </h1>
              <p className="text-gray-600 mt-1">
                Define seasonal periods that apply across all your listings
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Season
            </button>
          </div>
        </div>

        <div className="p-6">
          {isCreating && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-medium mb-4">Create New Season</h3>
              <SeasonForm
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                onCancel={handleCancel}
                seasonOptions={seasonOptions}
              />
            </div>
          )}

          <div className="space-y-4">
            {sortedSeasons.map((season) => (
              <div
                key={season.id}
                className="border border-gray-200 rounded-lg"
              >
                {editingId === season.id ? (
                  <div className="p-4 bg-blue-50">
                    <h3 className="text-lg font-medium mb-4">Edit Season</h3>
                    <SeasonForm
                      formData={formData}
                      setFormData={setFormData}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      seasonOptions={seasonOptions}
                    />
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {season.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              season.active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {season.active ? "Active" : "Inactive"}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Priority {season.priority}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Periods:</span>
                            <br />
                            {season.date_ranges
                              .map(
                                (range) =>
                                  `${new Date(
                                    range.start_date
                                  ).toLocaleDateString()} - ${new Date(
                                    range.end_date
                                  ).toLocaleDateString()}`
                              )
                              .join(", ")}
                          </div>
                          <div>
                            <span className="font-medium">Minimum Stay:</span>
                            <br />
                            {season.minimum_stay} night
                            {season.minimum_stay !== 1 ? "s" : ""}
                          </div>
                          <div>
                            <span className="font-medium">Total Duration:</span>
                            <br />
                            {season.date_ranges.reduce((total, range) => {
                              const days = Math.ceil(
                                (new Date(range.end_date).getTime() -
                                  new Date(range.start_date).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              );
                              return total + days;
                            }, 0)}{" "}
                            days
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleToggleActive(season.id)}
                          className={`px-3 py-1 text-sm rounded ${
                            season.active
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          } transition-colors`}
                        >
                          {season.active ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleEdit(season)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(season.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {seasons.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No seasons defined
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first season to start managing seasonal pricing
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Season
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonsManagement;
