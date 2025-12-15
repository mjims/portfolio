<?php

namespace App\Virtual\Models;

/**
 * @OA\Schema(
 *      title="Contact Request",
 *      description="Contact form request body",
 *      type="object",
 *      required={"name", "email", "message"}
 * )
 */
class ContactRequest
{
    /**
     * @OA\Property(
     *      title="name",
     *      description="Name of the sender",
     *      example="John Doe"
     * )
     *
     * @var string
     */
    public $name;

    /**
     * @OA\Property(
     *      title="email",
     *      description="Email of the sender",
     *      format="email",
     *      example="john@example.com"
     * )
     *
     * @var string
     */
    public $email;

    /**
     * @OA\Property(
     *      title="subject",
     *      description="Subject of the message",
     *      example="Project Inquiry"
     * )
     *
     * @var string
     */
    public $subject;

    /**
     * @OA\Property(
     *      title="message",
     *      description="Message content",
     *      example="I would like to hire you."
     * )
     *
     * @var string
     */
    public $message;
}
